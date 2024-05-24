import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useUserContext } from "../../context/UserContext";

function Login() {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [isSuccess, setIsSuccess] = createSignal(null)
    const navigate = useNavigate()
    const { user, setUser } = useUserContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: email(),
            password: password(),
        };

        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),

        })

        const { token, user, success } = await response.json()
        setIsSuccess(success)
        if (isSuccess()) {
            setUser(user)
            localStorage.setItem('authToken', token)
            navigate('/', { replace: true })
        }



    };

    return (
        <div class="container mx-auto h-full flex justify-center items-center bg-white dark:bg-slate-900 dark:text-white">
            <div class="md:w-96 w-full  md:p-6 p-4 rounded-lg ">
                <h1 class="text-2xl mb-4 text-center font-bold">Login</h1>
                <form onSubmit={handleSubmit}>
                    <Show when={isSuccess() == false}>
                        <div className="text-center text-lg p-2  text-red-700">
                            Incorrect username or password

                        </div>
                    </Show>

                    <div class="mb-4">
                        <label class="text-xl block mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            class="w-full p-3 border rounded-md dark:bg-gray-500 dark:text-white dark:border-black dark:outline-none dark:placeholder:text-white"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label class="text-xl block mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            required
                            class="w-full p-3 border rounded-md dark:bg-gray-500 dark:text-white dark:border-black dark:outline-none dark:placeholder:text-white"
                            value={password()}
                            onInput={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div class="mb-4">
                        <button type="submit" class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Login
                        </button>
                    </div>
                    <p class="text-center text-gray-600">
                        Don't have an account? <A href="/register" class="text-blue-500 underline">Register</A>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
