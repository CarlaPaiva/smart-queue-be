export type IRequest = object

export class Result<T> {
    HasError: boolean;
    ErrorMessage: string;
    Result: T

    SetSuccess(r: T) {
        this.HasError = false
        this.ErrorMessage =  ''
        this.Result = r;
    }

    SetError(errorMessage: string) {
        this.HasError = true
        this.ErrorMessage =  errorMessage
    }
}

export class ResultValidation {
    HasError: boolean;
    ErrorMessage: string;

    SetSuccess() {
        this.HasError = false
        this.ErrorMessage =  ''
    }

    SetError(errorMessage: string) {
        this.HasError = true
        this.ErrorMessage =  errorMessage
    }
}

export interface IHandler<T> {
    Execute(request: IRequest): Result<T>
}

export interface IHandlerAsync<T> {
    ExecuteAsync(request: IRequest): Promise<Result<T>>
}