export const fetchBudget = async (id) => {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    return promise;
}

export const fetchTransactions = async (id) => {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/transactions`);

    return promise;
}


export const fetchBudgetedCategories = async (id) => {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);

    return promise;
}