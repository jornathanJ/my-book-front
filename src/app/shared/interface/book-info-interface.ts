export interface BookInfoListResult {
    lastBuildDate?: Date;
    total?: number;
    start?: number;
    display?: number;
    items?: MybookDetail [];
}

export interface MybookDetail {
    tag?: string;
    title?: string;
    link?: string;
    image?: string;
    author?: string;
    price?: string;
    discount?: string;
    publisher?: string;
    pubdate?: string;
    isbn?: string;
    description?: string;
}


export interface MyBookVO {
    tag?: string;
    name?: string;
    loaned?: boolean;
    loanedExtended?: boolean;
    loanedUser?: string;
    returnDate?: Date;
    returnDateExtended?: boolean;

    defaultLoanDay?: number;
    extendLoanDay?: number;
    mybookDetail?: MybookDetail;
}

export interface ColumnInfo {
    header?: string;
    binding?: string;
    subBind?: string;                    // data source에 nested object의 값을 사용할때 사용합니다. 단, 1단계까지만 가능 합니다.
    type?: 'normal' | 'button';          // Cell의 type을 지정합니다.
    conditionTF?: ColumnTFCondition;
}

export interface ColumnTFCondition {
    trueValue: string;      // 조건이 참일때 표시할 Text
    falseValue: string;
}

// export interface ColumnValueCondition {
//     valueType: 'string' | 'number'; // 조건을 어떻게 비교 할지 결정합니다.
//     target: string | number;
//     trueValue: string;
//     falseValue: string;
// }



