create table  brands (
	id INT generated always as identity primary key,
	name VARCHAR(100) not null 
);

create table cpu_brands(
	id INT generated always as identity primary key,
	name VARCHAR(100) not null
);

create table gpu_brands(
	id INT generated always as identity primary key,
	name VARCHAR(100) not null
);

create table cpu_series(
id INT generated always as identity primary key,
name VARCHAR(100) not null
);

create table ram_types(
	id INT generated always as identity primary key,
	name VARCHAR(100) not null
);

create table storage_types(
	id INT generated always as identity primary key,
	name VARCHAR(100) not null
); 

create table panel_types(
	id int generated always as identity primary key,
	name varchar(100) not null
);

create table operating_systems(
	id int generated always as identity primary key,
	name varchar(100) not null
);

create table laptops(
	id int generated always as identity primary key,
	
	brand_id int references brands(id),
	model varchar(255) not null,
	price decimal (10,2),
	stock_count int,
	warranty_months int,
	
	cpu_brand_id int references cpu_brands(id),
	cpu_series_id int references cpu_series(id),
	cpu_generation int,	
	cpu_model varchar(100),
	cpu_cores int,
	cpu_threads int,
	cpu_base_speed decimal,

	ram_capacity int,	
	ram_type_id int references ram_types(id),
	ram_speed int,
	
	storage_capacity int,
	storage_type_id int references storage_types(id),
	
	gpu_brands_id int references gpu_brands(id),
	gpu_model varchar(100),
	gpu_memory int,
	gpu_wattage int,
	gpu_is_integrated boolean,
	
	screen_size decimal(4,1),
	resolution varchar(50),
	panel_type_id int references panel_types(id),
	weight decimal,
	os_id int references operating_systems(id),
	
	tags jsonb
	
);