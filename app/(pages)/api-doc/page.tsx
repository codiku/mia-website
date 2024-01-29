import { getApiDocs } from '@/libs/swagger';
import {ReactSwagger} from '@/components/providers/ReactSwagger';

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}