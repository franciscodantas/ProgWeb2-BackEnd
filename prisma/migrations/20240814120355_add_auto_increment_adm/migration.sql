-- AlterTable
CREATE SEQUENCE adm_id_seq;
ALTER TABLE "Adm" ALTER COLUMN "id" SET DEFAULT nextval('adm_id_seq');
ALTER SEQUENCE adm_id_seq OWNED BY "Adm"."id";
