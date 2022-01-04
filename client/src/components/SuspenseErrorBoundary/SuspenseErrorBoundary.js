import React from 'react';

import { LoadingIndicator, Button } from 'components';

import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})

class SuspenseErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Zaktualizuj stan, aby następny render pokazał zastępcze UI.
        return { hasError: true };
    }

    componentDidCatch(error) {
        // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów np. Rollbar.com
        console.log(error);
    }

    tryAgain = async () => {
        await queryClient.refetchQueries()
        this.setState({ hasError: false })
    }

    render() {
        return (
            <React.Suspense fallback={<LoadingIndicator />}>
                {this.state.hasError ? (
                    <div>Something went wrong.<Button onClick={this.tryAgain}>Try again!</Button></div>
                ) : (
                    <React.Fragment>
                        {this.props.children}
                    </React.Fragment>
                )}
            </React.Suspense>
        )
    }
}

export default SuspenseErrorBoundary;