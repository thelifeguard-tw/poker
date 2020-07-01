import * as A from "fp-ts/lib/ReadonlyArray"

export class Room {
  private _players: ReadonlyArray<Player>
  constructor(players: ReadonlyArray<Player>) {
    this._players = players
  }
  add(player: Player): [Room, AddPlayerResult] {
    const newPlayers = A.cons(player, this._players)
    const newRoom = new Room(newPlayers)
    return [
      newRoom,
      {
        success: true,
      },
    ]
  }

  players(): ReadonlyArray<Player> {
    return this._players
  }

  static empty() {
    return new Room([])
  }
}

export type Player = {}

export type AddPlayerResult = {
  success: boolean
}
