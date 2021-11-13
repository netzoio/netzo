// IMPORTANT: destructure only static values (avoid loosing reactivity)

export function useWidget(ctx) {
  const {
    widget: { uid, i, _id },
    $console
  } = ctx // destructure only static values (avoid loosing reactivity)

  const topic = `[${uid}/${i || _id}]`

  return { uid, i, _id, $console, topic }
}
