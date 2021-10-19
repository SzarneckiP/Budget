export default function promiseMiddleware() {
    return function (next) {
        return function (action) {
            const { promise, type, ...rest } = action;

            if (!promise || typeof promise.then !== 'function') {
                return next(action);
            };

            const SUCCESS = `${type}_SUCCESS`;
            const FAILURE = `${type}_SUCCESS`;
            const REQUEST = `${type}_SUCCESS`;

            next({ type: REQUEST, ...rest });
            return promise
                .then(response => response.json())
                .then(data => {
                    next({                      // Funkcją next dispatch-ujemy typy akcji..
                        type: SUCCESS,
                        payload: data,
                        ...rest
                    })
                })
                .catch(err => {
                    next({
                        type: FAILURE,
                        err,
                        ...rest
                    })
                })
        }
    }
}