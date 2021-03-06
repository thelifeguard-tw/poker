import * as O from "fp-ts/lib/Option"
import * as T from "io-ts"
import { BooleanFromString as TBool } from "io-ts-types/lib/BooleanFromString"
import { NumberFromString as TNum } from "io-ts-types/lib/NumberFromString"
import { optionFromNullable as TOpt } from "io-ts-types/lib/optionFromNullable"
import "jest-extended"
import {
  defaultHandleError,
  HandleParseError,
  RawRequest,
  RawResponse,
  wrap,
  wrapBodies,
  wrapGet,
  wrapResponseBody,
} from "src/utils/ApiHandlerWrapper"

class MockRawResponse implements RawResponse {
  public receivedStatus = 0
  public receivedJson: any = null
  status = (n: number): RawResponse => {
    this.receivedStatus = n
    return this
  }
  json = (a: unknown): RawResponse => {
    this.receivedJson = a
    return this
  }
}

describe("api handler wrapping function", () => {
  it("should set status code and raw response body", () => {
    const mockReq: RawRequest = {
      headers: {},
      params: {},
      query: {},
      body: {
        blah: "hello",
      },
    }

    const mockRes = new MockRawResponse()

    const resBodyE = T.type({ result: T.boolean })

    const handler = wrap(
      T.unknown,
      resBodyE,
      T.unknown,
      T.unknown
    )(
      req => ({
        status: 200,
        body: { result: true },
      }),
      defaultHandleError
    )

    handler(mockReq, mockRes)

    expect(mockRes.receivedStatus).toEqual(200)
    expect(mockRes.receivedJson).toEqual({ result: true })
  })
  it("should parse body, url param, and query param", () => {
    const mockReq: RawRequest = {
      headers: {},
      params: {
        id: "345",
        word: "bird",
      },
      query: {
        someBoolean: "false",
      },
      body: {
        nums: [1, 2, 3],
      },
    }

    const mockRes = new MockRawResponse()

    const paramD = T.type({
      id: TNum,
      word: T.string,
    })
    const queryD = T.type({ someBoolean: TBool })
    const reqBodyD = T.type({
      nums: T.array(T.number),
    })

    const handler = wrap(
      reqBodyD,
      T.unknown,
      paramD,
      queryD
    )(
      req => ({
        status: 200,
        body: {
          body: req.body,
          param: req.params,
          query: req.query,
        },
      }),
      defaultHandleError
    )

    handler(mockReq, mockRes)

    expect(mockRes.receivedJson.param).toEqual({ id: 345, word: "bird" })
    expect(mockRes.receivedJson.query).toEqual({ someBoolean: false })
    expect(mockRes.receivedJson.body).toEqual(mockReq.body)
  })
  it("should accept custom error handler", () => {
    const mockReq: RawRequest = {
      headers: {},
      params: {},
      query: {},
      body: {},
    }

    const mockRes = new MockRawResponse()
    const reqBodyD = T.type({ nope: T.string })
    const customErrorHandler: HandleParseError = (e, res) =>
      res.status(500).json("boom")
    const handler = wrap(
      reqBodyD,
      T.unknown,
      T.unknown,
      T.unknown
    )(req => ({ status: 200, body: "success" }), customErrorHandler)

    handler(mockReq, mockRes)
    expect(mockRes.receivedStatus).toEqual(500)
    expect(mockRes.receivedJson).toEqual("boom")
  })

  it("should support skipping wrapping request body", () => {
    const mockReq = {
      headers: {},
      params: {
        p: "p1",
      },
      query: {
        q: "q1",
      },
      body: null,
    }
    const mockRes = new MockRawResponse()
    const resE = T.number
    const paramD = T.type({ p: T.string })
    const queryD = T.type({ q: T.string })

    const handler = wrapGet(
      resE,
      paramD,
      queryD
    )(
      req => ({
        status: 200,
        body: 1,
      }),
      defaultHandleError
    )

    handler(mockReq, mockRes)

    expect(mockRes.receivedJson).toEqual(1)
    expect(mockRes.receivedStatus).toEqual(200)
  })
  it("should support skip wrapping URL and query params", () => {
    const mockReq: RawRequest = {
      headers: {},
      params: {},
      query: {},
      body: {
        something: "else",
      },
    }

    const mockRes = new MockRawResponse()
    const reqBodyD = T.type({
      something: T.string,
    })

    const resBodyE = T.type({
      key: T.string,
    })

    const wrapper = wrapBodies(reqBodyD, resBodyE)(
      req => ({
        status: 201,
        body: {
          key: req.body.something,
        },
      }),
      defaultHandleError
    )
    wrapper(mockReq, mockRes)
    expect(mockRes.receivedStatus).toEqual(201)
    expect(mockRes.receivedJson).toEqual({ key: "else" })
  })
  it("should support wrapping only response body", () => {
    const mockReq: RawRequest = {
      headers: {},
      params: {},
      query: {},
      body: null,
    }

    const mockRes = new MockRawResponse()

    const resBodyE = TOpt(T.number)

    const handler = wrapResponseBody(resBodyE)(
      req => ({
        status: 200,
        body: O.some(777),
      }),
      defaultHandleError
    )

    handler(mockReq, mockRes)
    expect(mockRes.receivedJson).toEqual(777)
    expect(mockRes.receivedStatus).toEqual(200)
  })
})
