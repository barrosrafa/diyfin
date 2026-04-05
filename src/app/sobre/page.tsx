export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Sobre o diyfin.com.br</h1>
      <div className="prose prose-slate">
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          O **diyfin.com.br** nasceu com a missão de democratizar o acesso a ferramentas financeiras técnicas e precisas. 
          Acreditamos que cada pessoa deve ter autonomia para calcular seus próprios juros, impostos e planejar seu futuro financeiro sem depender de planilhas complexas ou consultores caros.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Nossa Filosofia</h2>
        <ul className="list-disc pl-6 space-y-4 text-slate-600">
          <li><strong>Precisão Técnica:</strong> Utilizamos as tabelas fiscais mais recentes (2026) e fórmulas matemáticas rigorosas.</li>
          <li><strong>Privacidade:</strong> Seus dados são processados localmente no seu navegador. Não armazenamos suas informações financeiras.</li>
          <li><strong>Gratuidade:</strong> Todas as nossas ferramentas são e sempre serão gratuitas para o público.</li>
          <li><strong>Educação:</strong> Mais do que apenas o resultado, explicamos o "porquê" e o "como" de cada cálculo.</li>
        </ul>
        <div className="mt-12 p-6 bg-sky-50 rounded-xl border border-sky-100">
          <p className="text-sm text-sky-800 italic">
            "Finanças DIY (Do It Yourself) não é apenas sobre economizar dinheiro, é sobre ganhar liberdade através do conhecimento."
          </p>
        </div>
      </div>
    </div>
  );
}
