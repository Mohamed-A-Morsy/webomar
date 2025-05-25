import React from 'react'
import { Button } from './ui/button'

export default function AdsSection() {
  return<>
    <div className="bg-secondary rounded-lg overflow-hidden mb-2 container">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-4">انضم إلى الانشطة الاجتماعية بالنادي الآن</h3>
              <p className="text-white opacity-90 mb-6">
                ينظم النادي بعض الرحلات والانشطة الاجتماعية التي يمكنك الانضمام اليها 
              </p>
              <div>
                <Button className="bg-accent hover:bg-accent-light text-secondary font-bold">
                  سجل الآن
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
             <img 
    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNhamFyaSUyMGNhbXAlMjB0cmF2ZWwlMjBjb3VudHJ5fGVufDB8fHx8MTY2MjI3MjY5Nw&ixlib=rb-1.2.1&q=80&w=1000" 
    alt="Safari Camp" 
    className="w-[800px] h-[400px] object-cover"
/>
            </div>
          </div>
        </div>
  
  
  
  
  
  
  
  </>
}
