# AGENTS.md

Este projeto deve ser operado pelo OpenCode usando o modelo Claude configurado no arquivo `opencode.jsonc`.

## Contexto do projeto
- Basear-se em `docs/ARCHITECTURE.md` para arquitetura e stack.
- Basear-se em `specs/sign-up.md` como especificação principal da funcionalidade em desenvolvimento.
- O escopo atual é criação de contas (`sign-up`) e não deve ampliar para outras funcionalidades.

## Regras
- Antes de qualquer alteração, leia a arquitetura e a especificação relevante.
- Respeite a stack definida: Next.js, React, TypeScript, Tailwind, Supabase, TRPC, React Hook Form e Shadcn.
- Não implementar recursos fora do fluxo de sign-up.
- Quando a tarefa for descrita como "Claude", execute a operação via OpenCode usando o modelo Claude já configurado.
- Sempre priorizar API + validação + persistência + feedback de sucesso/erro.

## Fluxo sugerido
1. Entender o requisito da feature.
2. Revisar `docs/ARCHITECTURE.md`.
3. Revisar `specs/sign-up.md`.
4. Propor ou implementar a mudança mínima necessária.
5. Validar a solução sem expandir escopo.

## Modelo
O projeto já usa o modelo Claude via `anthropic/claude-sonnet-4-5` em `opencode.jsonc`.
