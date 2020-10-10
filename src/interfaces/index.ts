export type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

export interface IUser {
  uid: string
  displayName: string
  photoURL?: string
  email?: string
  isAdmin?: boolean
  x: number
  y: number
  role?: number
}
