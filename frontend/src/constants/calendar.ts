export const months: Record<
  string,
  Array<{ name: string; short: string; number: number; days: number }>
> = {
  vn: [
    {
      name: 'Tháng Một',
      short: 'Tháng 1',
      number: 1,
      days: 31,
    },
    {
      name: 'Tháng Hai',
      short: 'Tháng 2',
      number: 2,
      days: 28,
    },
    {
      name: 'Tháng Ba',
      short: 'Tháng 3',
      number: 3,
      days: 31,
    },
    {
      name: 'Tháng Bốn',
      short: 'Tháng 4',
      number: 4,
      days: 30,
    },
    {
      name: 'Tháng Năm',
      short: 'Tháng 5',
      number: 5,
      days: 31,
    },
    {
      name: 'Tháng Sáu',
      short: 'Tháng 6',
      number: 6,
      days: 30,
    },
    {
      name: 'Tháng Bảy',
      short: 'Tháng 7',
      number: 7,
      days: 31,
    },
    {
      name: 'Tháng Tám',
      short: 'Tháng 8',
      number: 8,
      days: 31,
    },
    {
      name: 'Tháng Chín',
      short: 'Tháng 9',
      number: 9,
      days: 30,
    },
    {
      name: 'Tháng Mười',
      short: 'Tháng 10',
      number: 10,
      days: 31,
    },
    {
      name: 'Tháng Mười Một',
      short: 'Tháng 11',
      number: 11,
      days: 30,
    },
    {
      name: 'Tháng Mười Hai',
      short: 'Tháng 12',
      number: 12,
      days: 31,
    },
  ],
  en: [
    {
      name: 'January',
      short: 'Jan',
      number: 1,
      days: 31,
    },
    {
      name: 'February',
      short: 'Feb',
      number: 2,
      days: 28,
    },
    {
      name: 'March',
      short: 'Mar',
      number: 3,
      days: 31,
    },
    {
      name: 'April',
      short: 'Apr',
      number: 4,
      days: 30,
    },
    {
      name: 'May',
      short: 'May',
      number: 5,
      days: 31,
    },
    {
      name: 'June',
      short: 'Jun',
      number: 6,
      days: 30,
    },
    {
      name: 'July',
      short: 'Jul',
      number: 7,
      days: 31,
    },
    {
      name: 'August',
      short: 'Aug',
      number: 8,
      days: 31,
    },
    {
      name: 'September',
      short: 'Sep',
      number: 9,
      days: 30,
    },
    {
      name: 'October',
      short: 'Oct',
      number: 10,
      days: 31,
    },
    {
      name: 'November',
      short: 'Nov',
      number: 11,
      days: 30,
    },
    {
      name: 'December',
      short: 'Dec',
      number: 12,
      days: 31,
    },
  ],
}

export const years = (from:number,to:number) => {
    return Array.from(Array(to-from+1)).map(y=>from++)
}