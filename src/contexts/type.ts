export interface ActionWithPayload<Type, Payload = any>
  extends ActionWithoutPayload<Type> {
  payload: Payload;
}

export interface ActionWithoutPayload<Type> {
  type: Type;
}
