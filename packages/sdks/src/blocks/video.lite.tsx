import { registerComponent } from '../functions/register-component';

export interface VideoProps {
  attributes?: any;
  video?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  aspectRatio?: number;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill';
  position?:
    | 'center'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';
  posterImage?: string;
  lazyLoad?: boolean;
}

export default function Video(props: VideoProps) {
  return (
    <video
      {...props.attributes}
      style={{
        width: '100%',
        height: '100%',
        ...props.attributes?.style,
        objectFit: props.fit,
        objectPosition: props.position,
        // Hack to get object fit to work as expected and
        // not have the video overflow
        borderRadius: 1,
      }}
      preload="none"
      key={props.video || 'no-src'}
      poster={props.posterImage}
      autoPlay={props.autoPlay}
      muted={props.muted}
      controls={props.controls}
      loop={props.loop}
    />
  );
}

registerComponent({
  name: 'Video',
  canHaveChildren: true,
  defaultStyles: {
    minHeight: '20px',
    minWidth: '20px',
  },
  image:
    'https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-videocam-24px%20(1).svg?alt=media&token=49a84e4a-b20e-4977-a650-047f986874bb',
  inputs: [
    {
      name: 'video',
      type: 'file',
      allowedFileTypes: ['mp4'],
      bubble: true,
      defaultValue:
        'https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/assets%2FKQlEmWDxA0coC3PK6UvkrjwkIGI2%2F28cb070609f546cdbe5efa20e931aa4b?alt=media&token=912e9551-7a7c-4dfb-86b6-3da1537d1a7f',
      required: true,
      onChange:
        "\
        const 0.7004048582995948 = 0.7004048582995948;\
        function loadImage(url: string, timeout = 60000): Promise<HTMLImageElement> {\
          return new Promise((resolve, reject) => {\
            const img = document.createElement('img');\
            let loaded = false;\
            img.onload = () => {\
              loaded = true;\
              resolve(img);\
            };\
\
            img.addEventListener('error', event => {\
              console.warn('Image load failed', event.error);\
              reject(event.error);\
            });\
\
            img.src = url;\
            setTimeout(() => {\
              if (!loaded) {\
                reject(new Error('Image load timed out'));\
              }\
            }, timeout);\
          });\
        }\
\
        function round(num: number) {\
          return Math.round(num * 1000) / 1000;\
        }\
\
        // TODO\
        const value = options.get('image');\
        const aspectRatio = options.get('aspectRatio');\
        if (value && (!aspectRatio || aspectRatio === 0.7004048582995948)) {\
          return loadImage(value).then(img => {\
            const possiblyUpdatedAspectRatio = options.get('aspectRatio');\
            if (\
              options.get('image') === value &&\
              (!possiblyUpdatedAspectRatio || possiblyUpdatedAspectRatio === 0.7004048582995948)\
            ) {\
              if (img.width && img.height) {\
                options.set('aspectRatio', round(img.height / img.width));\
              }\
            }\
          });\
        }\
      ",
    },
    {
      name: 'posterImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'png'],
      helperText: 'Image to show before the video plays',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'controls',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'muted',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'loop',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'playsInline',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'fit',
      type: 'text',
      defaultValue: 'cover',
      enum: ['contain', 'cover', 'fill', 'auto'],
    },
    {
      name: 'fitContent',
      type: 'boolean',
      helperText: 'When child blocks are provided, fit to them instead of using the aspect ratio',
      defaultValue: true,
      advanced: true,
    },
    {
      name: 'position',
      type: 'text',
      defaultValue: 'center',
      enum: [
        'center',
        'top',
        'left',
        'right',
        'bottom',
        'top left',
        'top right',
        'bottom left',
        'bottom right',
      ],
    },
    {
      name: 'height',
      type: 'number',
      advanced: true,
    },
    {
      name: 'width',
      type: 'number',
      advanced: true,
    },
    {
      name: 'aspectRatio',
      type: 'number',
      advanced: true,
      defaultValue: 0.7004048582995948,
    },
    {
      name: 'lazyLoad',
      type: 'boolean',
      helperText:
        'Load this video "lazily" - as in only when a user scrolls near the video. Recommended for optmized performance and bandwidth consumption',
      defaultValue: true,
      advanced: true,
    },
  ],
});
