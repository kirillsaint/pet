export default interface Order {
	id?: number;
	recipient_full_name: string;
	recipient_phone_number: string;
	customer_id: number;
	driver_id: number;
	vehicle_id: number;
	delivery_city_id: number;
	created_at: string;
	deleviry_date?: string;
	cost: string;
}
