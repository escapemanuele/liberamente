export async function canCreateDump(userId: string): Promise<boolean> {
    const r = await fetch('/functions/v1/check-quota', {
      headers: { 'x-user-id': userId }
    })
  
    // 402 → quota exhausted
    if (r.status === 402) return false
    if (!r.ok) throw new Error('quota check failed')
  
    // premium users return {premium:true}
    const json = await r.json()
    return json.premium || (json.remaining ?? 0) > 0
  }