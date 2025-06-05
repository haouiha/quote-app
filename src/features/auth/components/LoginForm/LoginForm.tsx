import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, loginSchema } from './LoginForm.schema'

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => Promise<void>
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const handleSubmitForm = async (data: LoginFormData) => {
		try {
			clearErrors('root')
			await onSubmit(data)
		} catch (error) {
			setError('root', { message: (error as Error).message })
		}
	}

	return (
		<form className='space-y-6' onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='rounded-md space-y-2'>
				<div>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						type='text'
						autoComplete='username'
						className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10'
						placeholder='Username'
						{...register('username')}
					/>
					{errors.username && <p className='mt-1 text-sm text-red-600'>{errors.username.message}</p>}
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						autoComplete='current-password'
						className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10'
						placeholder='Password'
						{...register('password')}
					/>
					{errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
				</div>
			</div>

			{errors.root && <div className='text-red-500 text-sm text-center'>{errors.root.message}</div>}

			<div>
				<button
					type='submit'
					disabled={isSubmitting}
					className='relative w-full flex justify-center py-2 px-4 border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{isSubmitting ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>
	)
}
