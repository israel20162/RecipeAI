
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
function Register() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: name(),
      email: email(),
      password: password(),
    };

    const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
     
    })

    const user = await response.json()
    const navigate = useNavigate()
    navigate("/login", { replace: true });
    console.log(user)

    // Here you would typically send `userData` to your backend API to handle registration.
  };

  return (
    <div class="container mx-auto h-full flex justify-center items-center bg-white dark:bg-slate-900 dark:text-white">
      <div class="w-96  p-6 rounded-lg ">
        <h1 class="text-2xl mb-4 text-center font-bold">Register</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label class="text-xl block mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              class="w-full p-3 border rounded-md dark:bg-gray-500 dark:text-white dark:border-black dark:outline-none dark:placeholder:text-white"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </div>
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
              Register
            </button>
          </div>
          <p class="text-center text-gray-600">
            Already have an account? <A href="/login" class="text-blue-500 underline">Login</A>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
