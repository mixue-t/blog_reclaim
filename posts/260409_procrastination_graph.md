

import ProcrastinationWrapper from './ProcrastinationWrapper.jsx'

# Why Your Brain Is Wired to Procrastinate

You've had the essay due for three weeks. You haven't started. The deadline is tomorrow, and suddenly you're productive.

This isn't a character flaw. It's your brain doing math — just not the math you'd choose if you were thinking clearly.

---

## Two Discounts Working Against You

Your brain continuously evaluates whether a task is *worth it*. That evaluation has two built-in biases that conspire to make you delay.

### Reward Discounting

Future rewards feel less valuable than present ones. This is called **hyperbolic discounting** — the devaluation is steepest close to now, not linear across time. Finishing your thesis in three months feels abstractly good; watching Netflix right now feels concretely good.

Formally, a reward *A* delayed by *t* days is worth:

$$g_D(t) = \frac{1}{1 + k_D \cdot t}$$

where *k_D* is your personal impatience. Higher *k_D* = steeper drop-off = more procrastination.

### Effort Discounting

The more effort a task requires, the less valuable its reward feels. This is separate from time — even an *immediate* hard task can be devalued if the effort is perceived as too costly.

$$g_E(E) = \frac{1}{1 + k_E \cdot E}$$

where *E* is the objective effort cost and *k_E* is your effort aversion.

---

## The Combined Model

Put them together and you get the **subjective value** of a task at any moment in time:

$$V(t) = A \times \frac{1}{1 + k_D \cdot t} \times \frac{1}{1 + k_E \cdot E}$$

Both discounts multiply together — meaning a high-effort task with a distant reward is doubly devalued. The reward is far away *and* expensive to obtain.

---

## Why Procrastination Isn't About Laziness

Here's the key insight the model reveals: **you don't procrastinate because V(t) is negative — you procrastinate because V(t) is lower than the value of whatever you'd do instead.**

Your alternative activity (scrolling, socialising, watching something) has near-zero effort and immediate reward. Its value is barely discounted. The task only wins when V(t) finally rises above that baseline — which typically happens close to the deadline, when the delay term collapses.

That's why deadlines work. They're not motivational tricks — they're mathematically forcing V(t) upward by reducing *t*.

---

## Try It

The graph below plots V(t) across the 15 days before a deadline. The dashed green line is the value of your alternative activity. The vertical line marks the earliest day you'd rationally start the task.

Drag the sliders to see how your personal parameters shape when you begin.

<DiscountingGraph />

**Things to try:**
- Raise the **alternative value** — watch the start day move closer to the deadline
- Lower **k_D** — a patient person starts much earlier
- Raise **E** — a harder task gets started later even with the same deadline
- Set the alternative so high that V(t) never crosses it — the task never gets started without external consequences

---

## What This Means Practically

The model suggests three levers for reducing procrastination:

**Reduce t** — artificial intermediate deadlines make the reward feel sooner. Break the task into chunks with their own deadlines.

**Reduce E** — lower the perceived effort cost of *starting*. Commitment devices (opening the document, writing one sentence) exploit the fact that anticipated effort is discounted more than experienced effort.

**Lower the alternative** — remove competing high-value activities. Going to a library works not because of the atmosphere, but because it eliminates the alternatives that otherwise win the equation.

---

*Model based on: Chong et al. (2017), Nature Neuroscience — effort discounting in nucleus accumbens; Tanaka et al. (2024), Scientific Reports — temporal discounting predicts real-world procrastination; Oberlin et al. (2022), Nature Communications — neurocomputational account of procrastination.*