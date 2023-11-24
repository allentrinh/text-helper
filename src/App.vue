<script lang="ts" setup>
import { ref, reactive } from "vue";
import useConvertText, { ConversionMethod } from "@/composables/text-helper";
import { useClipboard } from "@vueuse/core";
import { watch } from "vue";

const text = ref<string>("");
const convertedTexts = reactive<{ [key: string]: string }>({});

const { copy: copyToClipboard, copied, text: clipboardText } = useClipboard();

const convertText = () => {
  Object.keys(ConversionMethod).forEach((method) => {
    const { convertedText: updated } = useConvertText(
      method as ConversionMethod,
      text.value
    );
    convertedTexts[method] = updated;
  });
};

const resetCopied = () => {
  // copied.value = false;
};

watch([text], () => {
  convertText();
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3 bg-blue-grey-darken-4" flat density="compact">
      <v-app-bar-title>Allen's text helpers</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-blue-grey-darken-2">
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pa-4 bg-blue-grey-lighten-3"
            >
              <p class="text-button">Input</p>
              <v-textarea
                variant="solo"
                label="Text to convert"
                v-model="text"
              ></v-textarea>
              <p class="text-button">Output</p>
              <p v-if="!Object.keys(convertedTexts).length" class="text-body-1">
                Nothing to show. Try adding some input text.
              </p>
              <v-sheet
                v-for="(convertedText, key) in convertedTexts"
                :key="key"
                class="bg-blue-grey-lighten-3 hover:bg-red group relative"
              >
                <p class="text-overline">{{ key }}</p>
                <v-text-field
                  variant="solo"
                  disabled
                  :value="convertedText"
                  class="cursor-pointer pointer-events-auto"
                  @mouseenter="resetCopied"
                  @click="() => copyToClipboard(convertedText)"
                ></v-text-field>
                <span
                  class="opacity-0 group-hover:opacity-90 w-full h-[56px] absolute z-50 top-8 left-0 flex justify-center items-center bg-slate-700 rounded-sm pointer-events-none text-button"
                  :class="[
                    copied && clipboardText === convertedText
                      ? 'text-emerald-950 bg-green-500 opacity-100'
                      : 'text-white',
                  ]"
                >
                  {{
                    copied && clipboardText === convertedText
                      ? "Copied!"
                      : "Click to copy"
                  }}
                </span>
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
