export class User {
    constructor(
        public name: string,
        // private _token: string,
        // private _tokenExpiry: Date
    ) {}

    // get token() {
    //     if (!this._tokenExpiry || new Date() > this._tokenExpiry) {
    //         return null; 
    //     }
    //     return this._token;
    // }
}