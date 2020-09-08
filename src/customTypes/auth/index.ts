export interface SignInBody {
    email: string;
    pwd: string;
}

export interface SignUpBody {
    name: string;
    email: string;
    pwd: string;
    grade: number;
    school: string;
    stdNum: string;
}
