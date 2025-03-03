export type ClassesAndDepts = {
    school_classes: ClassSimple[],
    departments: DeptSimple[]
}

export type ClassSimple = {
    name: string,
    title: string,
    short_title: string,
    school_year: string
}

export type DeptSimple = {
    name: string,
    title_vn: string,
    title_en: string,
    short_title: string
}
