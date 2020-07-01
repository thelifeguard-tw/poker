import "jest-extended"
import { Player, Room } from "src/room/Room"

describe("Room", () => {
  it("should add player", () => {
    const room = Room.empty()
    const player: Player = {}
    const [, addResult] = room.add(player)
    expect(addResult.success).toBeTrue()
  })
  it("should start as empty", () => {
    const room = Room.empty()
    const players = room.players()
    expect(players).toBeEmpty()
  })

  it("should list added players", () => {
    const room = Room.empty()
    const p1: Player = {}
    const p2: Player = {}

    // consider using State monad
    const [r1] = room.add(p1)
    const [r2] = r1.add(p2)

    const playerList = r2.players()
    expect(playerList).toHaveLength(2)
    expect(playerList).toContain(p1)
    expect(playerList).toContain(p2)
  })
})
