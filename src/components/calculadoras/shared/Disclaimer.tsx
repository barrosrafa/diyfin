export function Disclaimer({ text }: { text?: string }) {
  return (
    <p className="mt-6 text-xs text-center italic" style={{ color: '#86868b' }}>
      {text ?? 'Resultado de caráter informativo. Não substitui orientação profissional ou validade legal.'}
    </p>
  );
}
