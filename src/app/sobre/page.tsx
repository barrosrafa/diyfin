export default function SobrePage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px' }}>
      <h1
        className="font-semibold mb-6"
        style={{ fontSize: '2.5rem', color: '#1d1d1f', letterSpacing: '-0.025em' }}
      >
        Sobre o diyfin.com.br
      </h1>

      <p
        className="text-lg leading-relaxed mb-8"
        style={{ color: '#6e6e73', lineHeight: 1.6 }}
      >
        O <strong style={{ color: '#1d1d1f', fontWeight: 600 }}>diyfin.com.br</strong> nasceu com a missão de democratizar o acesso a ferramentas financeiras técnicas e precisas.
        Acreditamos que cada pessoa deve ter autonomia para calcular seus próprios juros, impostos e planejar seu futuro financeiro sem depender de planilhas complexas ou consultores caros.
      </p>

      <h2
        className="font-semibold mt-10 mb-5"
        style={{ fontSize: '1.5rem', color: '#1d1d1f', letterSpacing: '-0.015em' }}
      >
        Nossa Filosofia
      </h2>

      <ul className="space-y-4" style={{ paddingLeft: '0', listStyle: 'none' }}>
        {[
          {
            title: 'Precisão Técnica',
            desc: 'Utilizamos as tabelas fiscais mais recentes (2026) e fórmulas matemáticas rigorosas.',
          },
          {
            title: 'Privacidade',
            desc: 'Seus dados são processados localmente no seu navegador. Não armazenamos suas informações financeiras.',
          },
          {
            title: 'Gratuidade',
            desc: 'Todas as nossas ferramentas são e sempre serão gratuitas para o público.',
          },
          {
            title: 'Educação',
            desc: 'Mais do que apenas o resultado, explicamos o "porquê" e o "como" de cada cálculo.',
          },
        ].map(({ title, desc }) => (
          <li
            key={title}
            style={{
              background: '#f5f5f7',
              borderRadius: '14px',
              padding: '18px 22px',
            }}
          >
            <strong style={{ color: '#1d1d1f', fontWeight: 600 }}>{title}:</strong>{' '}
            <span style={{ color: '#6e6e73' }}>{desc}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-12 p-6"
        style={{
          background: 'rgba(0,113,227,0.06)',
          borderRadius: '16px',
          border: '1px solid rgba(0,113,227,0.15)',
        }}
      >
        <p className="text-sm italic" style={{ color: '#0071e3', lineHeight: 1.6 }}>
          "Finanças DIY (Do It Yourself) não é apenas sobre economizar dinheiro, é sobre ganhar liberdade através do conhecimento."
        </p>
      </div>
    </div>
  );
}
