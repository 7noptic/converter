import AuthModalState from '~/components/AppHeader/auth-modal.state';

export default interface IAuthForm {
    valid: boolean,
    mode: AuthModalState
    inputs: {
        firstname: string,
        lastname: string,
        email: string,
        password: string
    },
}