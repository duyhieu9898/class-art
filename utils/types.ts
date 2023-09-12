export interface IMenuItem {
  type?: 'link' | 'button'
  text?: string
  icon?: string
  href?: any
  route?: any
  target?: string
}

export interface IClass {
  className?: string
  studentTotal: number
  studentRegister: number
  date: string
  description: string
}
