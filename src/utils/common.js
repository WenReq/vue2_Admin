function repair0(m) {
  return m < 10 ? '0' + m : m;
}

export function formatting(timeParams) {
  const time = new Date(timeParams);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return (
    y +
    '-' +
    repair0(m) +
    '-' +
    repair0(d) +
    ' ' +
    repair0(h) +
    ':' +
    repair0(mm) +
    ':' +
    repair0(s)
  );
}
