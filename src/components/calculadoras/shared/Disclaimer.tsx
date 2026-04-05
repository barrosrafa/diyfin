export function Disclaimer({ text }: { text?: string }) {
  return (
    <p className="mt-6 text-xs text-slate-400 text-center italic">
      {text ?? 'Resultado de caráter informativo. Não substitui orientação profissional ou validade legal.'}
    </p>
  );
}
