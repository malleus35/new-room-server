export namespace SignUpTypes {
    export interface SignUpPostBody {
        name: string;
        email: string;
        pwd: string;
        grade: number;
        school: string;
        stdNum: string;
    }
    export interface SignUpBody extends SignUpPostBody {
        id: number;
    }
}
