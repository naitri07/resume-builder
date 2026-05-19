import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';

export default function ResumePreview({ data, template }) {
  if (template === 'template1') {
    return <Template1 data={data} />;
  }
  return <Template2 data={data} />;
}