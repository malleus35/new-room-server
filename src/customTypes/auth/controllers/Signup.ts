export namespace SignUpTypes {
    export interface SignUpBody {
        name: string;
        email: string;
        pwd: string;
        grade: number;
        school: string;
        stdNum: string;

        accessToken?: string;
        refreshToken?: string;
    }
}
