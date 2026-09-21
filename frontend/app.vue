<template>
  <div style="font-family: system-ui, sans-serif; max-width: 1000px; margin: 40px auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
    <header style="border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 24px;">
      <h1 style="margin: 0; font-size: 24px; color: #38bdf8;">🧠 Pi-JEV-DSK AGI Agent Control Center</h1>
      <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Real-world AGI orchestration powered by Pi process channels, JEV memory/eval, and DSK reasoning kernels.</p>
    </header>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <!-- Control Panel -->
      <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
        <h2 style="font-size: 18px; margin-top: 0; color: #e2e8f0;">Goal Submission</h2>
        <label style="display: block; font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Real-World Problem / AGI Objective:</label>
        <textarea v-model="goal" rows="4" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #475569; color: #fff; border-radius: 6px; resize: vertical; box-sizing: border-box;" placeholder="e.g., Analyze and optimize global supply chain logistics and generate automated mitigation code..."></textarea>
        
        <button @click="runAGI" :disabled="loading" style="margin-top: 12px; background: #0284c7; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer; width: 100%;">
          {{ loading ? 'Running DSK Reasoning Loop...' : 'Execute AGI Task' }}
        </button>

        <div v-if="result" style="margin-top: 20px; background: #0f172a; padding: 12px; border-radius: 6px; border: 1px solid #10b981;">
          <h3 style="margin: 0 0 8px; font-size: 14px; color: #10b981;">Execution Result:</h3>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap; color: #cbd5e1;">{{ JSON.stringify(result, null, 2) }}</pre>
        </div>
      </div>

      <!-- Live Trace & Pi Mailbox -->
      <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; display: flex; flex-direction: column;">
        <h2 style="font-size: 18px; margin-top: 0; color: #e2e8f0;">DSK Reasoning Trace</h2>
        <div style="flex-grow: 1; background: #0f172a; padding: 12px; border-radius: 6px; border: 1px solid #475569; height: 260px; overflow-y: auto; font-family: monospace; font-size: 12px;">
          <div v-if="trace.length === 0" style="color: #64748b;">Waiting for execution trace...</div>
          <div v-for="(step, idx) in trace" :key="idx" style="margin-bottom: 6px; color: #38bdf8;">
            {{ step }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const goal = ref('Optimize real-time smart grid energy distribution algorithms')
const loading = ref(false)
const result = ref(null)
const trace = ref([])

const runAGI = async () => {
  loading.value = true
  result.value = null
  trace.value = ['[UI] Dispatching goal to backend DSK kernel...']

  try {
    const res = await fetch('http://localhost:3001/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: goal.value })
    })
    const data = await res.json()
    result.value = data.output
    if (data.trace) {
      trace.value = data.trace
    }
  } catch (err) {
    trace.value.push(`[Error] Failed to connect to AGI backend: ${err.message}`)
  } finally {
    loading.value = false
  }
}
</script>
