export default function removeVersion(ret) {
  if (typeof ret.__v !== 'undefined') {
    delete ret.__v;
  }
}
