import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
;

export const pointsStore = defineStore("points", () => {
  const points = ref<{ 
    id: string;
    longitude: number;
    latitude: number;
    text: string;
    address: string;
    color: string;
    region_name: string;
    url_point: string;
    date: string;
  }[]>([]);

  const setPointsQueueId = (
    id: string,
    longitude: number,
    latitude: number,
    text: string,
    address: string,
    color: string,
    region_name: string,
    url_point: string,
    date: string
  ) => {
    points.value.push({
      id,
      longitude,
      latitude,
      text,
      address,
      color,
      region_name,
      url_point,
      date,
    });
  };

  return { points, setPointsQueueId };
});


// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useIngestStore = defineStore("ingest", () => {
//   const ingestQueueId = ref<string | null>(null);

//   const setIngestQueueId = (id: string) => {
//     ingestQueueId.value = id;
//   };

//   return { ingestQueueId, setIngestQueueId };
// });





// store.setIngestQueueId(response.data.db_ingest.ingest_queue_id);
// } catch (error: any) {
//   console.error(error);
// }


// import { useIngestStore } from "../../stores/useIngestStore";

// const ingest_url = ref("");
// const isDragging = ref(false);
// const files = ref<File[]>([]);
// const fileInput = ref<HTMLInputElement | null>(null);
// const emit = defineEmits(["isDragging:option"]);

// const store = useIngestStore();