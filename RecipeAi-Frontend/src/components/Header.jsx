import { A } from "@solidjs/router";
import { useUserContext } from "../context/UserContext";
import { Show } from "solid-js";

function Header(props) {
  const { user } = useUserContext()
  function getFirstLetters(str) {
   try {
     const firstLetters = str
       .split(' ')
       .map(word => word.charAt(0))
       .join(' ');

     return firstLetters;
   } catch (error) {
    
   }
  }

  

  return (
    <header class="p-4  dark:bg-gray-900 justify-between w-full flex">
      <button onClick={props.darkMode} class="text-black">
        O
      </button>
      <Show when={!user}>
        <div class="flex gap-2 ">
          <A href="/register" class="dark:text-white  underline underline-offset-4 ">Register</A>
          <A href="/login" class="dark:text-white  underline underline-offset-4 ">Login</A>
        </div>
      </Show>
      <Show when={user}>
        <div class="rounded-full capitalize p-1  dark:text-blue-700 dark:bg-blue-300">
          {getFirstLetters(user.name)}

        </div>

      </Show>
     
    </header>
  )
}

export default Header;