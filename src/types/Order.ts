export default interface Order {
	id?: number;
	recipient_full_name: string;
	recipient_phone_number: string;
	customer_id: number;
	driver_id?: number;
	vehicle_id?: number;
	created_at: string;
	delivery_date: string;
	cost?: string;
	loading_address: string;
	unloading_address: string;
	cargo: string;
	cargo_type_id: number;
	status: "delivered" | "pending";
}
