interface BookList {
    tag?: string;
    name?: string;
    IsLoaned?: boolean;

    IsLoanedExtended?: boolean;
    loanedUser?: number;
    returnDate?: Date;

    returnDateExtended?: Date;
    defaultLoanDay?: number;
    extendLoanDay?: number;
}
