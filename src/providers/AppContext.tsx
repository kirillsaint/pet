import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

export type AppContextType = {
	props: PropsType;
	setProps?: Dispatch<SetStateAction<PropsType>>;
};

export type IUser = {
	id: number;
	full_name: string;
	phone_number: string;
	email_address: string;
	city_id: number;
	passport: string | null;
	is_driver: boolean;
	is_admin: boolean;
	remember_me_token: any;
	created_at: string;
	updated_at: string;
	password?: string;
};

export type PropsType = {
	auth: IUser | null;
};

const AppContext = createContext<AppContextType>({
	props: {
		auth: null,
	},
});

export default function AppProvider({ children }: { children: ReactNode }) {
	const [props, setProps] = useState<PropsType>({
		auth: null,
	});

	return (
		<AppContext.Provider value={{ props, setProps }}>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext };
