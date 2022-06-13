-- FUNCTION for column updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TABLE product

CREATE TABLE public.product
(
    id bigserial NOT NULL,
    id_store bigserial NOT NULL,
    name character varying(40) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric(11, 2) NOT NULL,
    stock bigint NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.product
    OWNER to postgres;
	
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.product
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- TABLE sale

CREATE TABLE public.sale
(
    id bigserial NOT NULL,
    id_client bigserial NOT NULL,
	id_store bigserial NOT NULL,
	total_price numeric(11, 2) NOT NULL,
    status boolean NOT NULL DEFAULT TRUE,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.sale
    OWNER to postgres;
	
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.sale
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- TABLE sale_product

CREATE TABLE public.sale_product
(
    id_sale bigserial NOT NULL,
    id_product bigserial NOT NULL,
    quantity bigint NOT NULL,
    price numeric(11, 2) NOT NULL
)

-- TABLE user

CREATE TABLE public.user
(
    id bigserial NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    neighborhood character varying(40) NOT NULL,
    street integer NOT NULL,
    avenue integer NOT NULL,
    number character varying(30) NOT NULL,
    role character varying(10) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone NOT NULL DEFAULT NOW(),
)

ALTER TABLE IF EXISTS public.user
    OWNER to postgres;
	
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.user
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
