import { notFound } from 'next/navigation';
import ProductForm from './product-form';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Criar novo produto';

  if (productId !== 'new') {
    product = null;

    if (!product) {
      notFound();
    }
    pageTitle = `Editar produto`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
