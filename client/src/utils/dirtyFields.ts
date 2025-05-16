export function dirtyFieldsOnly(allValues: Record<string, any>, dirty: any) {
  const result: Record<string, any> = {};
  Object.keys(dirty).forEach((key) => {
    result[key] = allValues[key];
  });
  return result;
}
