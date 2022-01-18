import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import AddTransactionForm from './AddTransactionForm';
import API from 'data/fetch';
import { toast } from 'react-toastify';

const AddTransactionView = () => {

    const { data: budget } = useQuery(['budget', 1], () => API.budget.fetchBudget(1));
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(API.budget.addTransaction, {
        onSuccess: () => {
            queryClient.refetchQueries(['budget', 1]);
            history.goBack();
            toast.success('Success! Your transaction has added!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    });

    const handleSubmitAddTransaction = (values) => {
        mutation.mutate({
            budgetId: budget.id,
            data: values,
        });
    };
    return (
        <AddTransactionForm
            categories={allCategories}
            groupCategoriesBy={'parentCategory.name'}
            onSubmit={handleSubmitAddTransaction}
        />
    );
};

export default AddTransactionView;
