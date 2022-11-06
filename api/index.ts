// Provide nuxt-axios instance to use same configuration across the whole project
import HttpRequestType from '~/types/request/http-request.type';
import User from '~/types/user/user.type';
import ConverterAddTypes from '~/components/AppConverter/converter-add.types';

export default $axios => () => ({
    /** User ============================================= */
    getUsers<S, F> (promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'get',
            'users',
            false,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    /** User ============================================= */
    getUserById<S, F> (id: Pick<User, 'id'>, promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'get',
            `users/${id}`,
            false,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    registerUser<S, F> (data: Omit<User, 'id'>, promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'post',
            'users',
            data,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    addConversionByUserId<S, F> (id: Pick<User, 'id'>, data: ConverterAddTypes, promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'post',
            `users/${id}/conversions`,
            data,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    getConversionsByUserId<S, F> (id: Pick<User, 'id'>, promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'get',
            `users/${id}/conversions`,
            false,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    getBanners<S, F> (promiseFuncSuccess: S, promiseFuncFail: F) {
        this.request(
            'get',
            `slides`,
            false,
            promiseFuncSuccess,
            promiseFuncFail
        );
    },
    /** REQUEST ============================================= */
    request (type: HttpRequestType, path: string, data: any, promiseFuncSuccess: any, promiseFuncFail: any) {
        const config = {
            params: {}
        };

        if (type === 'post') {
            $axios.$post(`/${path}`, data, config).then((response: any) => {
                if (promiseFuncSuccess) {
                    promiseFuncSuccess(response);
                }
            }).catch((exceptData: any) => {
                if (exceptData.response) {
                    if (promiseFuncFail) {
                        promiseFuncFail(exceptData?.response?.data);
                    } else {
                        console.log('error', exceptData);
                    }
                }
            });
        } else if (type === 'get') {
            if (data) {
                config.params = data;
            }

            $axios.$get(`/${path}`, config).then((response: any) => {
                if (promiseFuncSuccess) {
                    promiseFuncSuccess(response);
                }
            }).catch((exceptData: any) => {
                if (exceptData) {
                    if (promiseFuncFail) {
                        promiseFuncFail(exceptData?.response?.data);
                    } else {
                        console.log(exceptData);
                    }
                }
            });
        }
    }
});

