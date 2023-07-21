import { useForm } from 'react-hook-form';
import { isValid, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from '../categories';

const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long.' })
    .max(20, { message: 'Description must be at most 20 characters long.' }),
  amount: z
    .number({ invalid_type_error: 'Amount is required' })
    .min(0.01, { message: 'Amount must be at least $0.01.' })
    .max(100_000, { message: 'Amount must be at most $100,000.' }),
  category: z.enum(categories, {
    errorMap: () => ({
      message: 'Category is required',
    }),
  }),
  // q: how to make string only accept letters?
  // a: use regex in zod
});

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  // q: what is the purpose of the FieldValues type?
  // a: it is a generic type that is used to represent the values of the form

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register('description')}
          // q : what is the purpose of the register method?
          // a : it registers the input field with the react-hook-form library
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          className="form-control"
          {...register('category')}>
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
