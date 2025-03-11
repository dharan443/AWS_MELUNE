import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-1 items-center'>
				<img src='/melune.png' className='size-12' alt='Melune logo' />
				<p className="font-sans font-bold">Melune</p>
			</div>
			<div className='flex items-center gap-4'>
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

				
				<SignedIn>
					<UserButton />
				</SignedIn>

				{/* <UserButton /> */}
			</div>
		</div>
	);
};
export default Topbar;
