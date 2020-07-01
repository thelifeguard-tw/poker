import { AddPlayerResult, Player, Room } from "src/room/Room"
import { TypedRequest, TypedResponse } from "src/utils/ApiHandlerWrapper"

interface RoomRepository {
  getDefaultRoom(): Room
  saveDefaultRoomState(r: Room): void
}

export class RoomApi {
  private roomRepository: RoomRepository
  constructor(repo: RoomRepository) {
    this.roomRepository = repo
  }
  AddPlayer() {
    return (req: TypedRequest<unknown>): TypedResponse<AddPlayerResult> => {
      // TODO: load from request
      const player: Player = {}
      const room = this.roomRepository.getDefaultRoom()
      const [newRoomState, addResult] = room.add(player)
      this.roomRepository.saveDefaultRoomState(newRoomState)
      return {
        status: 200,
        body: addResult,
      }
    }
  }
}
