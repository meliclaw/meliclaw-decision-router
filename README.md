<div align="center">

<img src="website/static/img/artworks/vllm-sr-logo.dark.png" alt="Meliclaw Decision Router" width="50%"/>

<p>An open, programmable <strong>decision layer</strong> for models and compute.</p>

![Go](https://img.shields.io/badge/Go-1.25-00ADD8?logo=go&logoColor=white)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)

</div>

---

## About

**Intelligence beyond any one model.**

Meliclaw Decision Router is a fork of
[vLLM Semantic Router](https://github.com/vllm-project/semantic-router),
licensed Apache 2.0. It gives your agent harness one API for many models,
selecting or combining models for each call, guided by your policy.

Your harness keeps the agent loop, tools, and task state. The Router chooses
among configured backends across local, private, and cloud compute.

| Dimension | Fragmented today | With Meliclaw Decision Router |
| --- | --- | --- |
| **Models** | Different models excel at different tasks. | Select or combine models. |
| **Compute** | Hardware varies in speed and capacity. | Choose among configured backends. |
| **Location** | Edge, private, and cloud. | Keep calls within approved locations. |
| **Preference** | Priorities change by task. | Set quality, latency, and cost priorities. |

See [AGENTS.md](AGENTS.md) for the repository entrypoint and
[tools/agent/docs/README.md](tools/agent/docs/README.md) for the canonical
documentation index.

## Getting Started

### Build from source

```bash
make build-router
```

See **[AGENTS.md](AGENTS.md)** and the root `Makefile` for the full set of
build, run, and test targets (`make docker-help` lists container targets).

### Connect your agent harness

Point your harness at the Router's inference endpoint; see
`config/config.yaml` for listener configuration.

## Project history

Meliclaw Decision Router inherits its codebase and release history from the
upstream vLLM Semantic Router project. The entries below are historical
announcements from that upstream project (unmodified titles/links,
preserved for attribution and context):

- [2026/10/06] [Decision 2.0](https://huggingface.co/collections/vllm-sr/decision-20) reached #1 on Hugging Face Trending Collections.
- [2026/10/06] [Vela 2.0: Towards Open Foundation Routing Models](https://vllm-sr.ai/blog/vela-2-0-open-foundation-routing-models/)
- [2026/09/24] [vLLM Semantic Router v0.4 Hermes: Many Models, One Improving System](https://vllm-sr.ai/blog/v0.4-vllm-sr-hermes-release/)
- [2026/09/22] [Introducing Decision 1.0: Open Decision Foundation Models](https://vllm-sr.ai/blog/decision-models/)
- [2026/09/18] [Introducing Vela 1.0](https://vllm-sr.ai/blog/vela-models/)
- [2026/08/24] [Find Your Focus: How to Join and Work Together](https://vllm-sr.ai/blog/join-vllm-sr-workgroups/)
- [2026/08/05] [LettuceDetect v2 in Semantic Router: Generative Hallucination Detection as a vLLM Endpoint](https://vllm-sr.ai/blog/lettucedetect-v2-generative-hallucination-detection/)

<details>
<summary>Earlier announcements (upstream)</summary>

- [2026/07/21] [Beyond a Single Model: Building Mixture-of-Models Systems with vLLM Semantic Router](https://vllm-sr.ai/blog/vllm-sr-new-chapter-mom/)
- [2026/07/09] [Adding Cursor-Style Auto Model Selection to OpenCode with vLLM Semantic Router](https://vllm-sr.ai/blog/opencode-auto-mode/)
- [2026/06/29] [Micro-Agent: Beat Frontier Models with Collaboration inside Model API](https://vllm-sr.ai/blog/micro-agent-frontier-models/)
- [2026/06/16] [Beyond One Model: Fusion in vLLM Semantic Router](https://vllm-sr.ai/blog/vllm-sr-fusion-api/)
- [2026/06/05] [vLLM Semantic Router v0.3 Themis: From Signals to Stateful Production Routing](https://vllm-sr.ai/blog/v0.3-vllm-sr-themis-release/)
- [2026/03/24] Vision Paper Released: [The Workload-Router-Pool Architecture for LLM Inference Optimization](https://vllm-sr.ai/vision-paper)
- [2026/03/10] v0.2 Released: [vLLM Semantic Router v0.2 Athena Release](https://vllm.ai/blog/v0.2-vllm-sr-athena-release)
- [2026/02/27] White Paper Released: [Signal Driven Decision Routing for Mixture-of-Modality Models](https://vllm-sr.ai/white-paper/)
- [2026/01/05] Iris v0.1 Released: [vLLM Semantic Router v0.1 Iris: The First Major Release](https://blog.vllm.ai/2026/01/05/vllm-sr-iris.html)
- [2025/12/16] Collaboration: [AMD × vLLM Semantic Router: Building the System Intelligence Together](https://blog.vllm.ai/2025/12/16/vllm-sr-amd.html)
- [2025/12/15] New Blog: [Token-Level Truth: Real-Time Hallucination Detection for Production LLMs](https://blog.vllm.ai/2025/12/14/halugate.html)
- [2025/11/19] New Blog: [Signal-Decision Driven Architecture: Reshaping Semantic Routing at Scale](https://blog.vllm.ai/2025/11/19/signal-decision.html)
- [2025/11/03] Paper Published: [Category-Aware Semantic Caching for Heterogeneous LLM Workloads](https://arxiv.org/abs/2510.26835)
- [2025/10/27] New Blog: [Scaling Semantic Routing with Extensible LoRA](https://blog.vllm.ai/2025/10/27/semantic-router-modular.html)
- [2025/10/12] Paper Accepted: [When to Reason: Semantic Router for vLLM](https://arxiv.org/abs/2510.08731)
- [2025/10/08] Collaboration: vLLM Semantic Router with [vLLM Production Stack](https://github.com/vllm-project/production-stack) Team.
- [2025/09/01] Released the project: [vLLM Semantic Router: Next Phase in LLM inference](https://blog.vllm.ai/2025/09/11/semantic-router.html).

</details>

## Contributing

If you want to contribute, start with **[CONTRIBUTING.md](CONTRIBUTING.md)**.

For repository-native development workflow and validation commands, use **[AGENTS.md](AGENTS.md)** as the entrypoint and **[tools/agent/docs/README.md](tools/agent/docs/README.md)** as the canonical index.

## Citation

Meliclaw Decision Router is a derivative work. If you find it helpful in
your research or projects, please cite the original upstream project:

```
@misc{semanticrouter2025,
  title={vLLM Semantic Router},
  author={vLLM Semantic Router Team},
  year={2025},
  howpublished={\url{https://github.com/vllm-project/semantic-router}},
}
```
