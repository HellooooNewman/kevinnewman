/** Join class names, skipping falsy ones: cx(styles.logo, visible && styles.visible) */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
